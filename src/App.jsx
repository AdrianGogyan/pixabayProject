import React, { useState } from 'react';
import './App.css';
import './Mobile.css';
import ApiFetching from './components/apiFetching';
import { FaSearch, FaAlignJustify } from 'react-icons/fa';
// import ImgFullscreen from './components/imgFullscreen';

function App() {

  // const [searchParam, setSearchParam] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const [showRes, setShowRes] = useState(false);
  const [searchParam, setSearchParam] = useState('');

  function handleKeyDown(e){
    if(e.key === 'Enter'){
      
      searchFunc();
      console.log('keyPressed');
    }
  }

  function searchFunc(){

    console.log('searching for:', searchWord);
    setSearchParam(searchWord);
    setShowRes(true);
    setSearchWord('');

  }



  return (
    <div className='App'>
      <div className='navbar'>
        <div className='logoText'>
          Pixabay
        </div>
        <div className='searchInput' >
          <input 
            type="search" 
            value={searchWord}
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearchWord(e.target.value)} 
          />
          <FaSearch onClick={searchFunc} />
        </div>
        <div className='navbarEl'>
          <button>Images</button>
          <button>Video</button>
          <button>Pixabay</button>
          <button>About</button>
        </div>
        <div className='navbarElSmall'>
          <FaAlignJustify />
        </div>
        
      </div>
      <div id='searchRes'>
        {showRes && <ApiFetching searchParam={searchParam} />}
      </div>
      <div id="imgFullscreen">

      </div>
    </div>
  )
}

export default App
