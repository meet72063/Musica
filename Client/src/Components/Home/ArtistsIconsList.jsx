import ArtistIcons from './ArtistIcons'
import Loading from '../SharedComponents/Loading'
import Error from '../SharedComponents/Error'
import useFetchArtist from '../../hooks/useFetchArtist'


const ArtistsIconsList = () => {
  const { loading, error, allArtist } = useFetchArtist()

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error error='something went wrong' />
  }

  return (
    <div className='  space-y-8 pr-5'>
      <h1 className='text-3xl text-white font-thin pl-5 font-Comfortaa'>Artists</h1>
      <div className=' grid md:grid-cols-4  lg:grid-cols-5 gap-8 xs:grid-cols-2'>
        {allArtist.map((artist, index) => {
          return <ArtistIcons key={index} {...artist} />
        })}
      </div>
    </div>
  )
}

export default ArtistsIconsList
