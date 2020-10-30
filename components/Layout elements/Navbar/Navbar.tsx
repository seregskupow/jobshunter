import "./style.scss";
import { useState } from "react";
import { signOut, useSession } from "next-auth/client";
import Link from "next/link";
import { useRouter } from 'next/router'
import Router from 'next/router';
export default function Navbar({ sessionUser }) {
  const router = useRouter()
  const searchParam = router.query.search === undefined ? "Type search..." :router.query.search;
  const [session, loading] = useSession();
  const [isOpen, setOpen] = useState(false);
  const [searchValue, setSearch] = useState(searchParam);
  let links = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Vacancies",
      link: "/vacancylist",
    },
  ];
  const toggleOpen = () => setOpen(!isOpen);
  const menuClass = `dropdown-menu${isOpen ? " show" : ""}`;
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
  const shouldUserAuth = () => {
    if (loading) {
      return (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      );
    }
    const user = session && session.user;
    return user ? (
      <>
        <li className="nav-item" key={Math.random()}>
          <div className="dropdown" onClick={toggleOpen}>
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span>
                <img
                  src={user.image}
                  alt=""
                  style={{ borderRadius: "50%", maxWidth: "50px" }}
                />
              </span>
              <span>{user.name}</span>
            </button>
            <div className={menuClass} aria-labelledby="dropdownMenuButton">
              <Link href="/profile">
              <a className="dropdown-item" >
                Profile
              </a>
              </Link>
              <a
                href={`/api/auth/signout`}
                className="dropdown-item btn btn-danger"
                onClick={(e) => {
                  e.preventDefault();
                  signOut({ callbackUrl: "http://localhost:3000" });
                }}
              >
                Sign out
              </a>
            </div>
          </div>
        </li>
      </>
    ) : (
      <li className="nav-item" key={Math.random()}>
        <Link href="/auth">
          <a className="nav-link">Auth</a>
        </Link>
      </li>
    );
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <a className="navbar-brand text-white" href="#">
        JobsHunter
      </a>
      <ul className="nav">
        {links.map((link) => (
          <li className="nav-item" key={Math.random()}>
            <Link href={link.link}>
              <a className="nav-link">{link.name}</a>
            </Link>
          </li>
        ))}
        {shouldUserAuth()}
        <li className="nav-item">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">
                Default
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder ={"Type search here..."}
              value = {searchValue}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              onChange ={event=>onInputChange(event.target.value)}
              onKeyDown = {onSearchSubmit}
            />
          </div>
        </li>
      </ul>
    </nav>
  );
}
