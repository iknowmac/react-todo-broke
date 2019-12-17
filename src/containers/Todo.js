
import _ from 'lodash';
import moment from 'moment';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

import {
  TextField, AppBar, Toolbar, Typography, Checkbox, IconButton, Button, List,
  ListItem, ListItemSecondaryAction, ListItemText, Dialog, DialogActions,
  DialogContent, DialogContentText
} from '@material-ui/core';

import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import DeleteIcon from '@material-ui/icons/Delete';

import {
  fetchTodos, createTodo, updateTodo, deleteTodo, selectTodo
} from '../redux/actions';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    maxWidth: 512,
    minWidth: 512,
    backgroundColor: theme.palette.background.paper,
  },
  flex: {
    flex: 1,
  },
  completeText: {
    // textDecoration: 'line-through',
    whiteSpace: 'normal'
  },
  textField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing()
  },
  error: {
    color: theme.palette.secondary.main
  }
});

class Todo extends Component {

  PropTypes = {
    classes: PropTypes.object.isRequired,
    todos: PropTypes.array.isRequired,
    fetchTodos: PropTypes.func.isRequired,
    createTodo: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    selectTodo: PropTypes.func.isRequired,
  }

  state = {
    items: [],
    showComplete: true,
    open: false,
    title: '',
    dueAt: '',
    selected: {},
    nextId: 1
  }

  componentDidMount() {
    this.props.fetchTodos();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.todos !== prevState.items) {
      return { items: nextProps.todos };
    }

    if (nextProps.selected !== prevState.selected) {
      return { selected: nextProps.selected };
    }

    if (nextProps.nextId !== prevState.nextId) {
      return { nextId: nextProps.nextId };
    }

    return null;
  }

  handleCreate = () => {
    const { title, dueAt, nextId } = this.state;
    const now = moment().format();
    const due = dueAt ? moment(dueAt).format() : '';
    const todo = {
      id: nextId,
      title: title,
      createdAt: now,
      updatedAt: now,
      dueAt: due,
      isComplete: false
    };
    this.props.createTodo(todo);
    this.handleClose();
  }

  handleRead = () => {
    const { items, showComplete } = this.state;
    return showComplete
      ? items : _.filter(items, { isComplete: false })
  }

  handleDelete = el => {
    const confirmation = window.confirm(
      `Are you sure you want to delete "${el.title}"?`
    );
    if (confirmation) {
      this.props.deleteTodo(el);
    }
  }

  handleComplete = el => {
    el.isComplete = !el.isComplete;
    this.props.updateTodo(el);
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => e => {
    this.setState({ [name]: e.target.value });
  };

  toggleShowComplete = () => {
    this.setState({ showComplete: !this.state.showComplete });
  }

  handleSelected = el => {
    this.props.selectTodo(el);
  }

  renderPrimaryText = el => {
    const { classes } = this.props;
    return(
      <div
        className={el.isComplete ? classes.completeText : null}
        onClick={() => this.handleSelected(el)}
      >
        {el.title}
      </div>
    );
  }

  renderSecondaryText = el => {
    const { classes } = this.props;
    return el.dueAt
      ? <span className={
        (moment() > moment(el.dueAt) && el.isComplete !== true) ? classes.error : ''
      }>DUE: {moment(el.dueAt).format("MM/DD/YY, hh:mm A")}</span>
      : null
  }

  render() {
    const { classes } = this.props;
    const { showComplete, title } = this.state;
    const items = _.orderBy(this.handleRead(), ['createdAt'], ['desc']);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              todo
            </Typography>
            <Button
              size="small"
              variant="outlined"
              color="inherit"
              onClick={this.handleOpen}
            >
              New Todo
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          {items.map(el => (
            <ListItem key={el.id} divider >
              <Checkbox
                icon={<RadioButtonUnchecked/>}
                checkedIcon={<RadioButtonChecked/>}
                checked={el.isComplete}
                tabIndex={-1}
                disableRipple
                color="primary"
                onClick={() => this.handleComplete(el)}
              />
              <ListItemText
                inset
                primary={this.renderPrimaryText(el)}
                secondary={this.renderSecondaryText(el)}
              />
              <ListItemSecondaryAction>
                <IconButton aria-label="Delete Item" onClick={() => this.handleDelete(el)}>
                  <DeleteIcon color="primary" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <AppBar position="static">
          <Toolbar>
            <div className={classes.flex} />
            <Button
              size="small"
              variant="outlined"
              color="inherit"
              onClick={() => this.toggleShowComplete()}
            >
              {showComplete ? 'Hide Complete' : 'Show Complete'}
            </Button>
          </Toolbar>
        </AppBar>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          aria-labelledby="form-dialog-todo-title"
        >
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                New Todo
              </Typography>
            </Toolbar>
          </AppBar>
          <DialogContent style={{marginTop: '22px'}}>
            <DialogContentText>
              To add a new todo, please enter your Title and optionally a Due
              Date. NOTE: If you provide a due date, you MUST include the time!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              fullWidth
              onChange={this.handleChange('title')}
            />
            <TextField
              style={{marginTop: '22px'}}
              id="dueAt"
              label="Date Due"
              type="datetime-local"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChange('dueAt')}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              disabled={title.length < 3}
              color="primary"
              onClick={this.handleCreate}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos.items,
    nextId: state.todos.nextId,
    selected: state.todos.selected,
  };
};

export default compose(
  withStyles(styles, { withTheme: true, name: 'Todo' }),
  connect(mapStateToProps, {
    fetchTodos, createTodo, updateTodo, deleteTodo, selectTodo
  })
)(Todo);
