import latestNews from "../../data/latestNews";

type LatestNewsType = {
  title: string;
  content: string;
  img: string;
};

export default function LatestNews() {
  const listOfNews: LatestNewsType[] = latestNews;
  return (
    <div className="mt-12 mb-20">
      <h1 className="font-bebasNeue text-6xl text-sky-800 text-center uppercase font-bold">
        Latest News
      </h1>
      <div className="flex justify-center flex-wrap gap-8 m-12">
        {listOfNews.map((news, index) => (
          <div key={index} className="latest-news-wrapper bg-gray-100">
            <div className="container">
              <div className="content">
                <h1 className="font-name">{news.title}</h1>
                <p className="font-base">{news.content}</p>
                <span className="font-semibold">Read More</span>
              </div>
              <img className="latest-news-image" src={news.img} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
