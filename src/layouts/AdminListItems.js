// src/layout/listItems.js

import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import PostAddIcon from '@mui/icons-material/PostAdd';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddIcon from '@mui/icons-material/Add';

export const adminlistitems = (
  <div>
    <ListItem button component="a" href="/admindashboard/voucherdashboard">
      <ListItemIcon>
        <VpnKeyIcon />
      </ListItemIcon>
      <ListItemText primary="Vouchers" />
    </ListItem>
    <ListItem button component="a" href="/admindashboard/examtable">
      <ListItemIcon>
        <QuestionAnswerIcon />
      </ListItemIcon>
      <ListItemText primary="Exam Table" />
    </ListItem>
    <ListItem button component="a" href="/admindashboard/adminaddexam">
      <ListItemIcon>
        <PostAddIcon />
      </ListItemIcon>
      <ListItemText primary="Add Exam" />
    </ListItem>
    <ListItem button component="a" href="/admindashboard/results">
      <ListItemIcon>
        <SportsScoreIcon />
      </ListItemIcon>
      <ListItemText primary="View Results" />
    </ListItem>
    <ListItem button component="a" href="/admindashboard/adminaddteacher">
      <ListItemIcon>
        <AddIcon />
      </ListItemIcon>
      <ListItemText primary="Add Teachers" />
    </ListItem>
    <ListItem button component="a" href="/admindashboard/teacherslist">
      <ListItemIcon>
        <FormatListBulletedIcon />
      </ListItemIcon>
      <ListItemText primary="Teachers List" />
    </ListItem>
  </div>
);
