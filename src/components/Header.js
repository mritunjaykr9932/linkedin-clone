import styled from "styled-components";
import { connect } from "react-redux";
import { SignOutAPI } from "../actions";
import React from "react";


const Header = (props) => {
  return (
    <Container>
      <Content>
        <Logo>
          <a href="/home">
            <img src="/images/home-logo.svg" alt=" " />
          </a>
        </Logo>
        <Search>
          <div>
            <input type="text" placeholder=" search" />
          </div>
          <SearchIcon>
            <img src="/images/search-icon.svg" />
          </SearchIcon>
        </Search>
        <Nav>
          <NavListwrap>
            <NavList className="active">
              <a>
                <img src="/images/nav-home.svg" />
                <span>Home</span>
              </a>
            </NavList>

            <NavList>
              <a>
                <img src="/images/nav-network.svg" />
                <span>My Network</span>
              </a>
            </NavList>

            <NavList>
              <a>
                <img src="/images/nav-jobs.svg" />
                <span>Jobs</span>
              </a>
            </NavList>

            <NavList>
              <a>
                <img src="/images/nav-messaging.svg" />
                <span>Messaging</span>
              </a>
            </NavList>

            <NavList>
              <a>
                <img src="/images/nav-notifications.svg" />
                <span>Notifications</span>
              </a>
            </NavList>

            <User>
              <a>
                {props.user && props.user.photoURL ? (
                  <img src={props.user.photoURL} alt="" />
                ) : (
                  <img src="/images/user.svg" alt="" />
                )}
                <span>
                  Me
                  <img src="/images/down-icon.svg" alt="" />
                </span>
              </a>

              <SignOut onClick={()=>props.SignOut()}>Sign out</SignOut>
            </User>

            <Work>
              <a>
                <img src="/images/nav-work.svg" alt="" />
                <span>
                  {" "}
                  Work
                  <img src="/images/down-icon.svg" alt="" />
                </span>
              </a>
            </Work>
          </NavListwrap>
        </Nav>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  background-color: white;
  border-bottom: 1px rgba(0, 0, 0, 0.08);
  left: 0;
  padding: 0 24px;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 100;
  padding-top: 5px;
  padding-bottom: 3px;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  min-height: 100%;
  max-width: 1128px;
`;

const Logo = styled.span`
  margin-right: 8px;
  font-size: 0;
`;
const Search = styled.div`
  opacity: 1;
  flex-grow: 1;
  border-color: #dce6f1;
  position: relative;

  & > div {
    max-width: 280px;
    input {
      border: none;
      box-shadow: none;
      background-color: #eef3f8;
      border-radius: 2px;
      color: rgba(0, 0, 0, 0.9);
      width: 218px;
      padding: 0 8px 0 40px;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      height: 34px;
      border-color: #dce6f1;
      vertical-align: text-top;
    }
  }

  input:focus {
    outline-color: #0a66c2;
  }
`;

const SearchIcon = styled.div`
  width: 40px;
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 2px;
  border-radius: 0 2px 2px 0;
  margin: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Nav = styled.nav`
  margin-left: auto;
  display: block;
  margin-top: 5px;

  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    bottom: 0;
    background: white;
    width: 100%;
    padding-top: 5px;
  }
`;

const NavListwrap = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  list-style: none;

  .active {
    span:after {
      content: "";
      transform: scaleX(1);
      border-bottom: 2px solid var(--white, #fff);
      bottom: 0;
      left: 0;
      position: absolute;
      transition: transform 0.2s ease-in-out;
      width: 100%;
      border-color: rgba(0, 0, 0, 0.9);
    }
  }
`;

const NavList = styled.li`
  display: flex;
  align-items: center;
  a {
    align-items: center;
    background: transparent;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: 400;
    justify-content: center;
    line-height: 1.5;
    min-height: 42px;
    min-width: 80px;
    position: relative;
    text-decoration: none;
    cursor: pointer;
    span {
      color: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      padding: 3px;
    }
    @media (max-width: 768px) {
      min-width: 70px;
      font-size: 11px;
    }
  }
  &:hover,
  &:active {
    a {
      span {
        color: rgba(0, 0, 0, 0.9);
      }
    }
  }
`;
const SignOut = styled.div`
  position: absolute;
  top: 65px;
  background: white;
  border-radius: 0 0 5px 5px;
  width: 100px;
  height: 40px;
  font-size: 0.9rem;
  transition-duration: 167ms;
  text-align: center;
  display: none;
`;

const User = styled(NavList)`
  a > svg {
    width: 24px;
    border-radius: 50%;
  }

  a > img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  span {
    display: flex;
    align-items: center;
  }

  &:hover {
    ${SignOut} {
        margin-top: -6px;
      align-items: center;
      display: flex;
      justify-content: center;
      cursor: pointer;
      width:5%;
    }
  }
`;

const Work = styled(User)`
  border-left: 1px solid rgba(0, 0, 0, 0.8);
`;

const mapStateToProps = (state) => {
  return {
      user: state.userstate.user,
  };
};
const mapDispatchToProps = (dispatch) => ({
    SignOut:()=> dispatch(SignOutAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
