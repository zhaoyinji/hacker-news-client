import React from 'react';

export const Header = (props) => {
    return(
        <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container">
                <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span> 
                </button>
                <a className="navbar-brand" href="/">Hacker News</a>
                </div>
                <div className="collapse navbar-collapse" id="myNavbar">
                <ul className="nav navbar-nav navbar-right">
                    <li><a href="/newstories">New</a></li>
                    <li><a href="/beststories">Best</a></li>
                    <li><a href="/askstories">Ask</a></li>
                    <li><a href="/showstories">Show</a></li>
                    <li><a href="/jobstories">Job</a></li>
                </ul>
                </div>
            </div>
        </nav>
    );
}