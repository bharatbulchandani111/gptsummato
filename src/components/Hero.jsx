import { logo, github } from "../assets";

const Hero = () => {
  return (<>
    <header
      className="w-full flex justify-center item-center
    flex-col"
    >
      <nav className="flex justify-between  items-center w-full mb-10 pt-3">
        <img src={logo} alt="summz" className="w-28 object-contain" />

        <button
          type="button"
          onClick={() =>
            window.open("https://github.com/bharatbulchandani111/")
          }
          className="white_btn rounded-full overflow-hidden"
          style={{ width: '4.5rem', height: '2.5rem' }} 
        >
          <img src={github} className="w-full h-full object-cover"/>
        </button>
      </nav>
      <h1 className="head_text">
        Summarize Articles with
        <br className="max-md:hidden" />
        <span className="bluegreen_gradient2">OpenAI GPT4</span>
      </h1>
      </header>
      <h2 className="desc">
        Automatically generates concise and coherent summaries of web articles
        when you input a link. It simplifies information, making it easier for
        users to quickly grasp the main points of lengthy online content.
      </h2>
      </>
    
  );
};

export default Hero;
