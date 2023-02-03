import React from 'react'
import { useState, useEffect } from 'react'
import {Loader, Card, FormField} from '../components'

const RenderCards = ({data, title}) => {
  if(data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />)
  }
  return (
    <h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase'>{title}</h2>
  )
}

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState('');

  return (
    <section className='max-w-7xl mx-auto'>
      <div className="">
        <h1 className='font-extrabold text-[20px] text-[#222328]'>Créa Sion</h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w[500px]'>Parcourez une collection d'images visuellement époustouflantes générées automatiquements par une AI.</p>
      </div>
      <div className="mt-16">
        <FormField />
      </div>
      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
              <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className='font-medium text-[#666e75] text-xl mb-3'>
                 Résultats pour : <span className='text-[#222328]'>"{searchText}"</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={[]}
                  title="Aucun résultat trouvé .. Réessayez" 
                />
              ) : (
                <RenderCards 
                  data={[]}
                  title="Aucun post créé encore"
                />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Home