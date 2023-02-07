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
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeOut] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
        setLoading(true);
        try {
          const response = await fetch('https://aipicgenerator.onrender.com/api/v1/post', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          if(response.ok) {
            const result = await response.json();
            setAllPosts(result.data.reverse());
          }
        } catch (error) {
          alert(error)
        } finally {
          setLoading(false)
        }
    }

    fetchPosts()
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value);
    setSearchTimeOut(
    setTimeout(() => {
      const searchedResults = 
      allPosts.filter((item) => 
      item.name.toLowerCase().includes(searchText.toLowerCase()) 
        || 
      item.prompt.toLowerCase().includes(searchText.toLowerCase()));
      setSearchedResults(searchedResults);
    }, 500)
    )
  }

  return (
    <section className='max-w-6xl mx-auto'>
      <div className="">
        <h1 className='rounded-md font-extrabold text-[35px] text-center p-5 mt-6 mb-14 bg-slate-400 text-white'>CréaTive</h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w[500px]'>Parcourez une collection d'images visuellement époustouflantes générées automatiquements par une AI.</p>
      </div>
      <div className="mt-10">
        <FormField 
          labelName="Rechercher un post :"
          type="text"
          name="text"
          placeholder="Rechercher une image"
          value={searchText}
          handleChange={handleSearchChange}
        />
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
                  data={searchedResults}
                  title="Aucun résultat trouvé .. Réessayez" 
                />
              ) : (
                <RenderCards 
                  data={allPosts}
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