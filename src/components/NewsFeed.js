import { useEffect, useState } from "react";
import axios from "axios";

const NewsFeed = () => {

    const [articles, setArticles] = useState(null)

    const gettingData = (data) => {
        if(data){//BITNO: if je bitno stavit jer je fetch call asynchronous. Nije garantirano da ce bit izvrseno prije nego program ude u novu liniju.
                 //zbog toga data zna bit prazna na prvi render pa triba stavit if da saceka da se popuni
            const x = data.slice(0,7);//od ogromnog niza uzimam samo prvih 7 elemenata
            setArticles(x);
            //console.log(articles);
        }
    }

    const ArticlesHtml = () => {
        return(
            articles.map((article, _index) => (
                <div key={_index}>
                    <a href={article.url}>
                        <p>{article.title}</p>
                    </a>
                </div>))
        )
    }

    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://crypto-news15.p.rapidapi.com/news',
            headers: {
              'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
              'X-RapidAPI-Host': 'crypto-news15.p.rapidapi.com'
            }
          };
          
          axios.request(options).then((response) => {
              //console.log(response.data);
              gettingData(response.data);
          }).catch((error) => {
              console.error(error);
          });
    }, [])
    

    return (
        <div className="news-feed">
            <h2>NewsFeed</h2>
            {articles && <ArticlesHtml />}
        </div>
    )
}

export default NewsFeed;
//{articles && <ArticlesHtml />} ovo triba stavit zbog istog razloga kao i onaj if gore jer moram sacekat da articles se napuni prije nego ga renderam
//https://stackoverflow.com/questions/67181488/useeffect-not-running-on-refresh