import React from 'react';
import './App.css';
import api from './api';
import PostView from './Components/PostView';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      title: '',
      content: '',
      result: [],
    }
  } 
  componentDidMount(){
    this.getPosts()
  }
  async getPosts(){
    const _result = await api.getAllPosts()
    console.log(_result) 
    this.setState({result: _result.data})
  }
  handlingChange = (event)=>{
    this.setState({[event.target.name]: event.target.value})
  }
 
  handlingSubmit = async (event) => {
    event.preventDefault()
    let result = await api.createPost({title:this.state.title, content: this.state.content})
    console.log("Complete", result.data)
    this.setState({title: '', content: ''})
    this.getPosts()
  }
  handlingDelete = async (event) =>{
    await api.deletePost(event.target.value)
    this.getPosts()

  }
  render(){
    return (
      <div className="App">
        <Container maxWidth="lg">

          <div className = "PostingSection">
          <Paper className = "PostingForm">
            <h2>
              대나무숲 글 작성하기
            </h2>
            <form onSubmit = {this.handlingSubmit}>

            <TextField
                id="standard-multiline-flexible"
                label="title"
                name="title"
                multiline
                rows="4"
                rowsMax="4"
                value={this.state.title}
                onChange={this.handlingChange}
              />

            
             <TextField
                id="standard-multiline-flexible"
                label="content"
                name="content"
                multiline
                rows="4"
                rowsMax="4"
                value={this.state.content}
                onChange={this.handlingChange}
              />
            
            <button type = "submit">
              Submit
            </button>
          </form>
          </Paper>
          </div>
          <div className = "ViewSection">
            {
              this.state.result.map((post) =>
              <div>
                 <PostView key = {post.id} id = {post.id} title = {post.title} content = {post.content}/>
                 <button value = {post.id} onClick = {this.handlingDelete}>delete</button>
                </div>
                )
            }
          </div>
          </Container>
      </div>
    );
  }
}

export default App;
