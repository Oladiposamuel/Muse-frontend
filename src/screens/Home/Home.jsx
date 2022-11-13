import React, { useState, useEffect, useRef, useContext } from 'react';
import './home.css';
import { motion } from 'framer-motion';
import { IsTopContext } from '../../context/isTopContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Stack from '../../components/Stack/Stack';
import { GiMusicSpell } from 'react-icons/gi';
import Loader from '../../components/Loader/Loader';

const Home = () => {

  const [playlists, setPlaylists] = useState([]);

  const [refresh, setRefresh] = useState(false);

  const { isTop, setIsTop} = useContext(IsTopContext);

  let imageDetails = [];

  useEffect(() => {

  }, [refresh])

  useEffect(() => {
    axios.get('https://muse-backend-production.up.railway.app/admin/get-access-token')
    .then(result => {
        //console.log(result.data);
        localStorage.setItem('accessToken', result.data.token[0].accessToken);
        localStorage.setItem('refreshToken', result.data.token[0].refreshToken);
        setRefresh(!refresh);
    })
    .catch(error => {
        console.log(error);
        if(error.response.data.success == false) {
          setShow(false);
          let refreshToken = localStorage.getItem('refreshToken');
  
          axios.get(`https://muse-backend-production.up.railway.app/admin/refresh-token/${refreshToken}`)
          .then(result => {
            console.log(result);
            localStorage.setItem('accessToken', result.data.accessToken);
            setShow(true);
            setRefresh(!refresh);
          })
          .catch(error => {
            console.log(error);
          })
        }
    })
  }, [])

  useEffect(() => {
    let accessToken = localStorage.getItem('accessToken');

    axios.get(`https://muse-backend-production.up.railway.app/admin/get-playlists/${accessToken}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(result => {
      //console.log(result.data);
      setPlaylists(result.data.playlistData.items);
    })
    .catch(error => {
      console.log(error);
      if(error.response.data.success == false) {
        setShow(false);
        let refreshToken = localStorage.getItem('refreshToken');

        axios.get(`https://muse-backend-production.up.railway.app/admin/refresh-token/${refreshToken}`)
        .then(result => {
          console.log(result);
          localStorage.setItem('accessToken', result.data.accessToken);
          setShow(true);
        })
        .catch(error => {
          console.log(error);
        })
      }
    })
  }, [])

  const setImage= (playlist, index) => {
    //console.log(playlist);
    imageDetails.push({
      "playlistId": playlist.id,
      "name": playlist.name,
      "description": playlist.description,
      "image": playlist.images[0].url,
      "owner": playlist.owner.display_name,
      "tracksNo": playlist.tracks.total,

    });
  }

  playlists.forEach(setImage);

  //console.log(imageDetails);

  const [show, setShow] = useState(false);

  useEffect(() => {
    display()
  }, [])

  const display = () => {
    setTimeout(() => {setShow(true)}, 2000)
  }

  //let repeated = new Array(1).fill([Image1, Image2, Image3, Image4]).flat();

return (
    <div className='home'>
      <Link to = ''><span className='logo'>MUSE <GiMusicSpell /> </span></Link>
      {show && <Stack onVote={(item, vote) => console.log(item.props, vote)} >
        {imageDetails.map((imageDetail, idx) => {
          let rotation = Math.random() * 10;
          //console.log(image);
          return (
            <div key={idx} className = 'content-box'>
                <motion.div
                initial={{scale: 1, rotate: -rotation}}
                animate={{ rotate: rotation, scale: [1, 1.1] }}
                //whileTap={{ scale: [1, 1.2] }}
                transition={{type: 'tween', duration: 5, repeat: Infinity}}
                className='img-box' style={{transform: `rotate(${rotation}deg)`}}>
                    <img src={imageDetail.image}  alt='img' className='home-img' />
                </motion.div>

                {<p className='playlist-name'>{imageDetail.name}</p>}

                {<p className='playlist-curator'>Curated By {imageDetail.owner}</p>}

                <Link to = {`/playlist/${imageDetail.playlistId}`}
                  state = {{id: imageDetail.playlistId}} >
                  <button className='btn'>View Playlist</button>
                </Link> 
            </div>
          )
        })}

      </Stack>}

      {!show && <Loader />}

    </div>
  )
}

export default Home