import React from "react";
import { Link } from "react-router-dom";
import Icons from "./../assets/images/sprite.svg";
import Logo from "./../assets/images/li-logo-white-01.png";

const Navigation = props => {
    return (
        <div className="nav">
            <div className="container nav__content">
                <div className="nav__left">
                    <Link className="nav__link" to="/dashboard">
                        <div className="nav__logo">
                            <img src={Logo} alt="logo-lineup" />
                        </div>
                    </Link>
                </div>

                <div className="nav__right">
                    <div>
                        {props.user && (
                            <span>
                                <Link className="nav__link" to="/create">
                                    <button>Create Event</button>
                                </Link>
                            </span>
                        )}
                    </div>

                    <div>
                        {props.user && (
                            <span>
                                <Link className="nav__link" to="/profile">
                                    <svg className="nav__icon icon">
                                        <use xlinkHref={`${Icons}#surfer`} />
                                    </svg>
                                </Link>
                            </span>
                        )}
                    </div>

                    <div>
                        {props.user ? (
                            <Link className="nav__link" to="/auth/logout">
                                <svg className="nav__icon icon">
                                    <use xlinkHref={`${Icons}#logout`} />
                                </svg>
                            </Link>
                        ) : (
                            <span>
                                <Link className="nav__link" to="/auth/sign-in">
                                    Sign in
                                </Link>
                                <Link className="nav__link" to="/auth/sign-up">
                                    Sign up
                                </Link>
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navigation;
