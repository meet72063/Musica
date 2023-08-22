import React from 'react'
import UploadSong from '../Components/UploaldFile/UploadSong'
import ArtistUpload from '../Components/UploaldFile/ArtistUpload'

const AdminPage = () => {
  return (
    <div className=' bg-slate-200  pl-20 pr-40'>
      <UploadSong/>
      <ArtistUpload/>
    </div>
  )
}

export default AdminPage

