import React from "react";
import Layout from "../components/Layout elements/Layout/Layout";
import { signOut,useSession } from "next-auth/client";
import { useRouter } from "next/router";
export default function profile() {
  const router = useRouter();
const [session, loading] = useSession();

  if (loading) {
    return (
      <>
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </>
    );
  }
 
  if(!loading && !session){
      router.push("/auth");
  }
  return (
    <>
      {session && (
        <>
          <div
            className="card text-white bg-dark"
            style={{ width: "100%", maxWidth: "18rem" }}
          >
            <img src={session.user.image} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Signed in as {session.user.email}</h5>
              <p className="card-text">
                Welcome,{" "}
                <span style={{ textDecoration: "line-through" }}>
                  motherfucker
                </span>{" "}
                {session.user.name}!
              </p>
              <a
                href={`/api/auth/signout`}
                className="btn btn-danger"
                onClick={(e) => {
                  e.preventDefault();
                  signOut({ callbackUrl: "http://localhost:3000" });
                }}
              >
                Sign out
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}
