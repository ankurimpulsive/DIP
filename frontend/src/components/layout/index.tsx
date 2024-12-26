import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {environment} from "../../environments/environment";

export type TodoResponse = {
    readonly todos: Todo[];
    readonly total: number;
    readonly skip:  number;
    readonly limit: number;
}

export type Todo = {
    readonly id:        number;
    readonly todo:      string;
    readonly completed: boolean;
    readonly userId:    number;
}


export function ButtonAppBar() {

    
    const [todos, setTodos] = React.useState<Todo[]>([]);
    const [todoText, setTodoText] = React.useState<string>('');
    const [username, setUsername] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [token, setToken] = React.useState<string>('');

    const isLoggedIn = (): boolean => {
      return token != '';
    }

    const getTodos = () => {
        fetch(`${environment.baseUrl}/todo`, {headers: {'Authorization': `Bearer ${token}`}})
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setTodos(data)
            });
    }

    const addTodo = () => {
        fetch(`${environment.baseUrl}/todo`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            body: JSON.stringify({
                todo: todoText,
                completed: false,
                userId: 5,
            })
            })
            .then((res) => { return res.json()})
            .then((x: Todo) => {
                // if(todos){
                    const _todos = todos;
                    _todos.push(x);
                    setTodos(_todos);
                // }
            });
    }

    const deleteTodo = (id: number) => {
        if(!window.confirm('Are you sure to delete to do')) return;
        fetch(`${environment.baseUrl}/todo/${id}`, {
            method: 'DELETE',
          headers: {'Authorization': `Bearer ${token}`}
        })
    .then()
    .then(() => {
        if(todos){            
            setTodos(todos?.filter(x=>x.id != id));
        }
        alert('To do deleted successfully')
    });
    }

    React.useEffect(()=> {
      let _token = localStorage.getItem('token')?.toString();
      if(_token){
        setToken(_token)
      }
    }, [])

  React.useEffect(()=> {
    if(token){
      getTodos();
    }
  }, [token])

  const handleLogin = () => {
    fetch(`${environment.baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: username,
        password: password,
      })
    })
      .then((res) => { return res.json()})
      .then((x) => {
        localStorage.setItem('token', x.access_token)
        setToken(x.access_token);
      });
  }

  const handleLogout = () => {
      localStorage.setItem('token', '')
    setToken('');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todos
          </Typography>
          {isLoggedIn() && <Button color="inherit" onClick={handleLogout}>Logout</Button>}
        </Toolbar>
      </AppBar>

      {!isLoggedIn() && <Box display={'flex'} justifyContent={'space-between'} marginTop={'10px'}>
        <TextField id="outlined-basic" label="Username" variant="outlined" value={username} onChange={(e) => {
          setUsername(e.target.value)
        }}/>
        <TextField id="outlined-basic" label="Password" type='password' variant="outlined" value={password}
                   onChange={(e) => {
                     setPassword(e.target.value)
                   }}/>
        <Button color="inherit" onClick={handleLogin}>Login</Button>
      </Box>}

      {isLoggedIn() && <Box display={'flex'} justifyContent={'space-between'} marginTop={'10px'}>
        <TextField id="outlined-basic" label="To Do" variant="outlined" value={todoText}
                   onChange={(e) => setTodoText(e.target.value)}/>
        <Button variant="contained" onClick={() => {
          addTodo()
        }}>Add Todo</Button>
      </Box>}
      {isLoggedIn() && <>
        {todos?.map((x) => {
          return <Box key={x.id} textAlign={'left'} component="section" sx={{p: 2, border: '1px dashed grey'}}
                      display={'flex'} justifyContent={'space-between'}>
            <Box>{x.todo}</Box>

            <Button variant="contained" onClick={() => {
              deleteTodo(x.id)
            }}><DeleteIcon/></Button>
          </Box>;
        })}</>}
    </Box>
  );
}
