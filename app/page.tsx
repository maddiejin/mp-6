import Link from "next/link";

export default function Home() {
  const clientId = process.env.GITHUB_CLIENT_ID_PUBLIC;
  const redirectUri = "http://127.0.0.1:3000/callback";
  
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=read:user`;

  return (
    <main className="font-serif bg-white max-w-2xl mx-auto my-12 p-8 rounded-lg shadow-lg">
      <div className="flex flex-col gap-6">
        <h1 className="font-['Playball'] text-5xl text-center text-[#2d622f] border-b-2 border-[#eee] pb-4 mb-2">
          CS391 OAuth
        </h1>

        <div className="bg-[#f9f9f9] p-8 rounded-lg shadow-inner flex flex-col gap-6 items-center text-center">
          
          <h2 className="text-2xl text-[#444] font-semibold">
            Welcome
          </h2>

          <p className="text-lg text-[#666] leading-relaxed max-w-md">
            Please sign in to view your profile, avatar, and account details using the OAuth provider.
          </p>

          <Link
            href={githubAuthUrl}
            className="inline-block px-8 py-3 bg-[#2d622f] text-white font-bold rounded-md transition transform hover:scale-105 hover:bg-opacity-80 focus:ring-2 focus:ring-offset-2 focus:ring-[#2d622f] no-underline"
          >
            Sign in with GitHub &rarr;
          </Link>
        </div>
      </div>
    </main>
  );
}