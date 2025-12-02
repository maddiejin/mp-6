import Link from "next/link";

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  email: string;
}

export default async function CallbackPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>; 
}) {
  
  const { code } = await searchParams;

  if (!code) {
    return (
        <div className="font-serif bg-white max-w-2xl mx-auto my-12 p-8 rounded-lg shadow-lg text-center">
            <h1 className="font-['Playball'] text-4xl text-red-600 mb-4">Error</h1>
            <p className="text-[#444]">No code provided. Check your URL parameters.</p>
        </div>
    );
  }

  const clientId = process.env.GITHUB_CLIENT_ID_PUBLIC; 
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  const tokenResponse = await fetch(
    `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`,
    {
      method: "POST",
      headers: { Accept: "application/json" },
    }
  );

  const tokenData = await tokenResponse.json();

  if (tokenData.error || !tokenData.access_token) {
    return (
      <div className="font-serif bg-white max-w-2xl mx-auto my-12 p-8 rounded-lg shadow-lg text-center">
        <h1 className="font-['Playball'] text-4xl text-red-600 mb-4">Auth Error</h1>
        <p className="text-[#444] mb-2">Error retrieving token:</p>
        <code className="bg-red-50 p-2 rounded text-red-800">{tokenData.error_description || "Unknown error"}</code>
      </div>
    );
  }

  const accessToken = tokenData.access_token;

  const userResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const userData: GitHubUser = await userResponse.json();

  return (
    <main className="font-serif bg-white max-w-2xl mx-auto my-12 p-8 rounded-lg shadow-lg">
      <div className="flex flex-col gap-6">
        <h1
          className="font-['Playball'] text-5xl text-center text-[#2d622f] border-b-2 border-[#eee] pb-4 mb-2"
        >
          User Profile
        </h1>

        <div className="bg-[#f9f9f9] p-8 rounded-lg shadow-inner flex flex-col items-center gap-4">

          <div className="relative">
             <img 
                src={userData.avatar_url} 
                alt="Profile" 
                className="w-32 h-32 rounded-full border-4 border-[#fff] shadow-md"
            />
          </div>

          <div className="text-center">
            <h2 className="font-['Playball'] text-4xl text-[#2d622f] mb-1">
              {userData.name || userData.login}
            </h2>
            <i className="text-lg text-[#666]">
                @{userData.login}
            </i>
          </div>

          <div className="w-full bg-white p-4 rounded border border-gray-200 mt-2 text-center">
            <p className="text-[#444]">
                <strong className="text-[#2d622f]">Email:</strong> {userData.email || "Private / Hidden"}
            </p>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-6 w-full flex justify-center">
            <Link
              href="/"
              className="inline-block px-6 py-2 bg-[#2d622f] text-white font-bold rounded-md transition transform hover:scale-105 hover:bg-opacity-80 focus:ring-2 focus:ring-offset-2 focus:ring-[#2d622f] no-underline text-center"
            >
              &larr; Sign Out
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}