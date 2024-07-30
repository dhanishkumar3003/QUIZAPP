// src/layout/listItems.js

import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import PostAddIcon from '@mui/icons-material/PostAdd';
export const mainListItems = (
  <div>
    <ListItem button component="a" href="/maindashboard/voucherdash">
      <ListItemIcon>
        <VpnKeyIcon />
      </ListItemIcon>
      <ListItemText primary="Vouchers" />
    </ListItem>
    <ListItem button component="a" href="/maindashboard/examtable">
      <ListItemIcon>
        <QuestionAnswerIcon />
      </ListItemIcon>
      <ListItemText primary="Exam Table" />
    </ListItem>
    <ListItem button component="a" href="/maindashboard/addexam">
      <ListItemIcon>
        <PostAddIcon />
      </ListItemIcon>
      <ListItemText primary="Add Exam" />
    </ListItem>
    <ListItem button component="a" href="/maindashboard/results">
      <ListItemIcon>
        <SportsScoreIcon />
      </ListItemIcon>
      <ListItemText primary="View Results" />
    </ListItem>
  </div>
);
