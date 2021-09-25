import Head from "next/head";
import CourseView from "components/CourseView";

const data: Course = {
  title: "React for Beginners: Build an App, and Learn the Fundamentals",
  description: "TBD",
  lessons: [
    {
      title: "Introduction",
      description: "TBD",
      duration: 1.5,
      youtubeVideoId: "eg16mepPImk",
    },
    {
      title: "Introducing Codesandbox",
      description: "TBD",
      duration: 2,
      youtubeVideoId: "MxHGyqobsbI",
    },
    {
      title: "Fundamentals: Components",
      description: "TBD",
      duration: 5,
      youtubeVideoId: "uVn0wOB07pY",
    },
  ],
};

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>YouTube University</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <CourseView data={data} />
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .logo {
          height: 1em;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: Robot, -apple-system, BlinkMacSystemFont, Segoe UI,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
