import React, { useEffect, useState } from 'react';
import './playlist.css';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BiPlay } from 'react-icons/bi';
import { GiMusicSpell } from 'react-icons/gi';
import Loader from '../../components/Loader/Loader';

const Playlist = () => {

  const location = useLocation();

  const navigate = useNavigate();

  let { playlistId} = useParams();

  //console.log(playlistId);

  const [playlistData, setPlaylistData] = useState();

  const [show, setShow] = useState(false);

  const [refresh, setRefresh] = useState(false);

  console.log(playlistData);

  useEffect(() => {

  }, [refresh])

  useEffect(() => {
    setRefresh(false);

    let accessToken = localStorage.getItem('accessToken');

    axios.get(`https://muse-backend-production.up.railway.app/admin/get-playlist/?id=${playlistId}&token=${accessToken}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(result => {
      console.log(result);

      setPlaylistData(result.data.playlistData);
      setRefresh(!refresh);
    })
    .catch(error => {
      console.log(error);

      if(error.response.data.success == false) {
        //setShow(false);
        let refreshToken = localStorage.getItem('refreshToken');

        axios.get(`https://muse-backend-production.up.railway.app/refresh-token/${refreshToken}`)
        .then(result => {
          console.log(result);
          localStorage.setItem('accessToken', result.data.accessToken);
          //setShow(true)
          setRefresh(!refresh);
      })}
    })
  }, [])

  const [ showTracks, setShowTracks] = useState(false);

  const [ coverImage, setCoverImage ] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      display();
    }, 2000)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      let coverImage = document.querySelector('#coverBox');
      let coverHeight = coverImage.offsetHeight;

      setCoverImage(coverHeight);
      setShowTracks(true);
    
      console.log(coverHeight);

      setRefresh(!refresh);
    }, 3000)
  }, [])

  const display = () => {
    setShow(true);
  }

  return (
    <div className='playlist'>
      <Link to = '/'><span className='logo'>MUSE <GiMusicSpell /> </span></Link>
        {show && <>
          <div className='cover-image-box' style={{height: coverImage}}>
            <img src={playlistData.images[0].url} alt='img' className='img' id='coverBox' />
            <motion.img
              initial={{rotate: -540}}
              animate={{rotate: 540}}
              transition={{type:'tween', duration: 10, repeat: Infinity}}
            src={playlistData.images[0].url} alt='img' className='img-round' />
          </div>

          {showTracks && <div className='tracks-box'>

            <a href={playlistData.external_urls.spotify} className='play-btn'> <div className='play-btn'> <BiPlay size={100} color={'#4b6037'} /> </div> </a>
            <h1 className='tracks-desc'>{playlistData.description}</h1>

            <div className='tracks-list'>
              {playlistData.tracks.items.map((track, idx) => {
                //console.log(track.track.preview_url);
                return(
                  <div className='track-details' key={idx}>
                    <span className='track-name'>{track.track.name}</span>
                    <span className='artist-name'> {track.track.artists[0].name} </span>

                    <audio src={track.track.preview_url} controls className='audio' />
                  </div>
                )
              })}
            </div> 
          </div> }
        </>}

        {!show && <Loader />}
    </div>
  )
}

export default Playlist