import React from "react";
import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick,remove } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  const [arr, setArr] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([]);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
  const [copied, setCopied] = useState("");

  useEffect(() => {
    const articlesFromLocal = JSON.parse(localStorage.getItem("articles"));

    if (articlesFromLocal) {
      setAllArticles(articlesFromLocal);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const existingArticle = allArticles.find((item) => item.url === arr.url);

    if (existingArticle) return setArr(existingArticle);

    const { data } = await getSummary({ articleUrl: arr.url });
    if (data?.summary) {
      const newArticle = { ...arr, summary: data.summary };
      console.log("new article", { newArticle }, "old arr", { arr });
      setArr(newArticle);
      const updatedArticles = [newArticle, ...allArticles];
      setAllArticles(updatedArticles);
      localStorage.setItem("articles", JSON.stringify(updatedArticles));
    }
  };

  const handleDelete = (url) => {
    console.log("ProductList.onDelete: ", url);
    const updatedProducts = allArticles.filter(item => item.url !== url);
    setAllArticles(updatedProducts);
    localStorage.setItem('articles', JSON.stringify(updatedProducts));
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      {/*search*/}
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex w-full justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img src={linkIcon} className="absolute left-0 w-5 my-2 ml-3" />
          <input
            type="url"
            value={arr.url}
            placeholder="Search for a demo"
            onChange={(e) => {
              setArr({
                ...arr,
                url: e.target.value,
              });
            }}
            onKeyDown={handleKeyDown}
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700"
          >
            ↩
          </button>
        </form>
        <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
          {allArticles.reverse().map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArr(item)}
              className='link_card'
            >
              <div className='copy_btn' onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt={copied === item.url ? "tick_icon" : "copy_icon"}
                  className='w-[40%] h-[40%] object-contain'
                />
              </div>
              <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                {item.url}
              </p>
              <div className="remove_btn" onClick={()=>handleDelete(item.url)}>
              <img src={remove} className="w-[50%] h-[50%] object-contain"/>
              </div>
              
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img src={loader} className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-inter font-bold text-center">
            that wasn't supposed to happen <br />
          </p>
        ) : (
          arr.summary && (
            <div className="flex flex-col gap-3 ">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">
                  {arr.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
