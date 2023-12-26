
import SongCard from './SongCard'


const SongCardList = ({ albums, playlistId }) => {
  return (
    <div className='pt-3 space-y-3 ml-1 pb-40'>
      {albums.map((track) => {
        return <SongCard key={track._id} {...track} albums={albums} playlistId={playlistId} />
      })}
    </div>
  )
}

export default SongCardList
