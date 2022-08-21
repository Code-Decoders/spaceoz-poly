import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect } from 'react'
import Upgrades from '../components/Upgrades'
import Warship from '../components/Warship'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [ships, setShips] = React.useState([])
  const [upgrades, setUpgrades] = React.useState([])

  const getData = async () => {
    console.log("getData")
    var ids = [1, 2, 3, 4, 5, 6, 7, 8];
    ids.map(id => {
      fetch('/api/items?id=' + id).then(res => res.json()).then(data => {
        if (data.type === "Warship") {
          setShips(val => {
            val.push(data)
            // remove duplicates from array where id is the same
            return [...new Set(val.map(item => item.id))].map(id => {
              return val.find(item => item.id === id)
            })
          })
        }
        else {
          setUpgrades(val => {
            val.push(data)
            // remove duplicates from array where id is the same
            return [...new Set(val.map(item => item.id))].map(id => {
              return val.find(item => item.id === id)
            })
          })
        }
      })
    })
  }

  useEffect(() => {
    getData()
  }, [])
  return (
    <div className={styles['home-container']}>
      <div style={{ padding: "2rem" }}>
        <h1>Trending Warships</h1>
        <div className={styles['horizontal-listview-container']}>
          <div className={styles['horizontal-listview']}>
            {
              ships.map((val, i) => (
                <Warship key={i} ship={val} />))
            }
          </div>
        </div>
        <h1>Top Upgrades</h1>

        <table className={styles['upgrade-table']}>
          <thead>
            <tr style={{ padding: "1rem" }}>
              <th></th>
              <th style={{ textAlign: "left" }}>Collection</th>
              <th>Damage</th>
              <th>Buy</th>
              <th>Owners</th>
            </tr>
          </thead>
          <tbody>
            {
              upgrades.map((val, i) => {
                return <Upgrades key={i} index={i + 1} upgrade={val} />
              })
            }
          </tbody>
        </table>
      </div>
      <footer className={styles.footer}>
        <a
          href="https://github.com/Code-Decoders"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '} CodeDecoders
        </a>
      </footer>
    </div>
  )
}
