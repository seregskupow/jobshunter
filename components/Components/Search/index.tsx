import './style.scss'
import { GetServerSideProps } from 'next'
import Router,{ useRouter } from 'next/router'
import {useState} from 'react';

export default function Search(props){
    const router = useRouter()
    const searchParam = router.query.search === undefined ? "Type search..." :router.query.search;
    const [searchValue, setSearch] = useState(searchParam);
    const onInputChange = (value:string) =>{
        setSearch(value);
      }
    const onSearchSubmit = (e) =>{
        if (e.key === 'Enter') {
          Router.push({
            pathname: '/vacancylist',
            query: { limit:10,search: searchValue },
        })
        }
      }
    return (
        <form onSubmit ={onSearchSubmit}>
            <input type="search" value ={searchValue} onKeyDown ={(e)=>onSearchSubmit(e)} onChange = {e=>onInputChange(e.target.value)} name="" id=""/>
        </form>
    )
}
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const searchKeyword: string =
      query.search === undefined ? "" : query.search.toString();
    const limit: number =
      query.limit === undefined ? 5 : parseInt(query.limit.toString());
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/photos?_limit=${limit}`
    );
    const posts = await res.json();
    return {
      props: {
        posts,
        searchKeyword,
        namespacesRequired: ['common','vacancyListPage']
      },
    };
  };
