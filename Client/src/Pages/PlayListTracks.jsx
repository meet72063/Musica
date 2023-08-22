import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import SongCardList from '../Components/ArtistPlaylist/SongCardList'
import { setcurrentArtist, setCurrentTrack, setIsplaying } from '../Features/CurrentTrack'
import { setPlayList, setNotShuffled, setShuffle } from '../Features/SongSlice'



const PlayListTracks = () => {
  const { id } = useParams()
  const { userPlaylists } = useSelector(store => store.playlists)
  const [{ name, songs, description, createdAt }] = userPlaylists.filter((playlist) => playlist._id === id)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const playAllHanlder = () => {

    dispatch(setCurrentTrack(songs[0]))
    dispatch(setIsplaying(true))
    dispatch(setPlayList(songs))
    dispatch(setNotShuffled(songs))
    dispatch(setShuffle(false))


  }

  return (
    <div className='bg-black min-h-screen flex gap-3  pb-1  pl-3 pr-3'>
      <div className=' bg-zinc-800 w-[100%]  text-white '>
        <div className=' pr-1 sm:h-full grid sm:grid-cols-[160px_1fr]'>
          <div className=' bg-zinc-900  sm:h-full border-gray-700 border-r-[0.5px]'>

          </div>
          <div className=' mt-4 ml-2'>
            <div className='flex space-y-1 flex-wrap'>
              <img src="/music13.jpg" alt="artist img" className='sm:w-[210px] sm:h-[210px] w-[190px] h-[190px] rounded-lg pl-1 mt-4 ' />
              <div className='ml-4 '>
                <h2 className='pt-2 text-red-400 mb-4'>Playlist</h2>
                <h2 className='xs:text-2xl  sm:text-6xl text-red-500 mb-4 '> {name}</h2>

                {songs.length>0 ? <h2>{description}</h2>:<h2 className='mt-2'>Playlist is Empty</h2> }


              </div>

            </div>
           {songs.length>0? <div className='mt-10 flex gap-x-12 border-b-gray-700 border-b-[0.3px] pb-5 mr-10' >
              <h1 className=' xs:text-xl sm:text-3xl ml-4'>{songs.length} Songs</h1>
              <button className='border-white border-2 w-32 h-10 rounded-lg' onClick={playAllHanlder}>play All</button>

            </div>:
            <button className='  xs:p-2 sm:p-2 rounded-md bg-red-500 ml-2 mt-5 font-cursive' onClick={()=>navigate('/allsongs')}>Add Songs</button>

             }
            <SongCardList albums={songs} playlistId={id} />

          </div>
        </div>

      </div>
    </div>
  )
}

export default PlayListTracks
