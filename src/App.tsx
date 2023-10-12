import React, {useEffect} from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { ThemeProvider } from './theming';
import { Navigation } from './navigation';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/reduxToolkit/store';
import { fetchGetProfile } from './reduxToolkit/profileThunk';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';

function App() {
  type AppDispatch = ThunkDispatch<void, any, AnyAction>;
  const dispatch: AppDispatch = useDispatch();
  const token = useSelector<RootState, string>((state) => state.profileSlice.token);
  useEffect(()=>{
    const accessToken = localStorage.getItem('accessToken')
    if(accessToken){
      dispatch(fetchGetProfile())
    }
  },[dispatch, token])

  return (
    <div className="App">
      <ThemeProvider>
        <BrowserRouter>
          <Layout>
            <Navigation />
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
