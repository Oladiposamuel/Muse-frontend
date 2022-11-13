import React from 'react';
import './loader.css';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className='loader-box'>
        <motion.div className='loader'>

            <motion.div 
            initial={{scaleY: 1}}
            animate={{scaleY: .2}}
            transition={{type: 'tween', duration: 1.5, repeat: Infinity}}
            className='load'>
                
            </motion.div>

            <motion.div 
            initial={{scaleY: 1}}
            animate={{scaleY: .2}}
            transition={{type: 'tween', duration: 1.5, delay: .5, repeat: Infinity}}
            className='load'>
                
            </motion.div>

            <motion.div 
            initial={{scaleY: 1}}
            animate={{scaleY: .2}}
            transition={{type: 'tween', duration: 1.5, repeat: Infinity}}
            className='load'>
                
            </motion.div>

            <motion.div 
            initial={{scaleY: 1}}
            animate={{scaleY: .2}}
            transition={{type: 'tween', duration: 1.5, delay: .5, repeat: Infinity}}
            className='load'>
                
            </motion.div>

            <motion.div 
            initial={{scaleY: 1}}
            animate={{scaleY: .2}}
            transition={{type: 'tween', duration: 1.5, repeat: Infinity}}
            className='load'>
                
            </motion.div>

            <motion.div className='load'>
                
            </motion.div>

            <motion.div 
            initial={{scaleY: 1}}
            animate={{scaleY: .2}}
            transition={{type: 'tween', duration: 1.5, repeat: Infinity}}
            className='load'>
                
            </motion.div>

            <motion.div 
            initial={{scaleY: 1}}
            animate={{scaleY: .2}}
            transition={{type: 'tween', duration: 1.5, delay: .5, repeat: Infinity}}
            className='load'>
                
            </motion.div>

            <motion.div 
            initial={{scaleY: 1}}
            animate={{scaleY: .2}}
            transition={{type: 'tween', duration: 1.5, repeat: Infinity}}
            className='load'>
            
            </motion.div>

            <motion.div 
            initial={{scaleY: 1}}
            animate={{scaleY: .2}}
            transition={{type: 'tween', duration: 1.5, delay: .5, repeat: Infinity}}
            className='load'>
                
            </motion.div>

            <motion.div 
            initial={{scaleY: 1}}
            animate={{scaleY: .2}}
            transition={{type: 'tween', duration: 1.5, repeat: Infinity}}
            className='load'>
                
            </motion.div>

        </motion.div>
    </div>
  )
}

export default Loader