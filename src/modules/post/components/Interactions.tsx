import React from 'react'
import Image from 'next/image'
import styles from '../styles/Interactions.module.scss'

const Interactions = () => {
  return (
    <div className={styles.interactionsWrapper}>
      <div>
        <button>
          <Image
            src={'/assets/interactions/heart.svg'}
            alt="heart icon"
            width="40"
            height="40"
          />
        </button>
        <div>50</div>
      </div>
      <div>
        <button>
          <Image
            src={'/assets/interactions/flag.svg'}
            alt="flag icon"
            width="40"
            height="40"
          />
        </button>
        <div>50</div>
      </div>
      <div>
        <button>
          <Image
            src={'/assets/interactions/dots.svg'}
            alt="3 dots icon"
            width="40"
            height="40"
          />
        </button>
      </div>
    </div>
  )
}
export default Interactions
