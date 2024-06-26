import React, { Component } from 'react'

import TITLE from "../../info/title";

import profile_avatar from "../images/profile_avatar.png";
import BasePage from '../Base';

import TaskList from './list';
import tasks from './info';


const Page_TITLE = TITLE + " - Assignments";
const username = "Vignesh Goswami";
const profileimage = profile_avatar;


export default class Assignments extends Component {
  componentDidMount() {
    document.title = Page_TITLE;
  }

  render() {
    return (
      <>
        <BasePage toggleHeader={true} toggleSidebar={true} toggleFooter={false}>
        
          <TaskList tasks={tasks}/>
        </BasePage>
      </>
    )
  }
}