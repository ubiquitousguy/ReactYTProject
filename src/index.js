import _ from 'lodash';
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

// in ES6 we don't use var keyword to declare variables, we use const or let. We use const
// whenever we use a variable that doesn't change in this case we are using for the api key.
const API_KEY = 'AIzaSyAAjqtrGEJO1rvy8XjTGsM3Nchb4H0RbMI';

// Create a new component. This component should produce some html. You always create
// only ONE component per file.
class App extends Component {
  constructor(props) {
    super(props);

      this.state = {
        videos: [],
        selectedVideo: null
       };

       this.videoSearch('dantdm');
    }

    videoSearch(term) {
      YTSearch({key: API_KEY, term: term}, (videos) => {
        this.setState({
          videos: videos,
          selectedVideo: videos[0]
        });
      });
    }

  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);
// For a multi line JSX expression like this make sure to use the () and put all the JSX
// inside of it. See below.
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail  video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
          videos={this.state.videos} />
      </div>
        );
      }
    }

// Take this component's generated html and put it on the page(in the Dom). We
// using ReactDom here to try to render something to the Dom. Remember React is used
// to create and manage our components. The document.querySelector('.container') is
// saying go find the div with class container then try to render the app component into
// that div.
ReactDom.render(<App />, document.querySelector('.container'));
