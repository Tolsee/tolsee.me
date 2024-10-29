const DATE_STARTED = new Date('2016-01-01');

export default function About() {
  const experience = new Date().getFullYear() - DATE_STARTED.getFullYear();

  return (
    <div className="relative">
      <div className="mx-auto max-w-4xl pb-16">
        <div className="mt-5 md:mt-10">
          <div className="flex flex-col md:flex-row md:items-center mb-8">
            <img
              src="https://github.com/tolsee.png"
              className="rounded-full w-48 h-48"
            />
            <div className="md:pl-5">
              <h2 className="p-0 m-0 mt-2 text-2xl font-black">
                Hey 👋, I&apos;m{' '}
                <span className="text-[--green]">Tulsi Sapkota.</span>
              </h2>
              <p className="text-[--textNormal] mt-1 text-2xl">
                🧑‍💻 Software Engineer and Creator
              </p>
            </div>
          </div>
          <p className="text-[--textNormal] mt-1 text-2xl mt-5">
            I am a self-taught software engineer. I have been building software
            solutions for over {experience} years. I love traslating ideas to
            code.
          </p>
        </div>
      </div>
    </div>
  );
}
