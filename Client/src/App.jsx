import { NavLink, Route, Router, Routes } from "react-router-dom"
import Login from "./Pages/Login"
import SignUp from "./Pages/SignUp"
import AlmostDone from "./Pages/AlmostDone"
import Home from "./Pages/Home"
import Start from "./Pages/Start"
import Profile from "./Pages/Profile"
import MusicPlayer from "./Components/SharedLayout/MusicPlayer"
import AllSongs from "./Pages/AllSongs"
import ArtistPlayList from "./Pages/ArtistPlaylist"
import Playlists from "./Pages/Playlists"
import CreatePlaylist from "./Pages/CreatePlaylist"
import PlayListTracks from './Pages/PlayListTracks'
import Favourites from "./Pages/Favourites"
import Artists from "./Components/Allartists/Artists"
import './App.css'
import CatogoryTracks from "./Pages/CatogoryTracks"





function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<MusicPlayer />}>
          <Route index element={<Home />} />
          <Route path='allSongs' element={<AllSongs />} />
          <Route path="artists" element={<Artists />} />
          <Route path='artist/:id' element={<ArtistPlayList />} />
          <Route path="playlists" element={<Playlists />} />
          <Route path="playlists/:id" element={<PlayListTracks />} />
          <Route path="createPlaylist" element={<CreatePlaylist />} />
          <Route path="favourites" element={<Favourites />} />
          <Route path="catogory/:id" element={<CatogoryTracks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/almostDone" element={<AlmostDone />} />
          <Route path="/start" element={<Start />} />
          <Route path="/profile" element={<Profile />} />




        </Route>






      </Routes>

    </>
  )
}

export default App
