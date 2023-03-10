import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { preview } from "../assets"
import {getRandomPrompt } from "../utils"
import {FormField, Loader} from '../components'

const CreatePost = () => {
  const navigate  = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch('https://aipicgenerator.onrender.com/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form)
        })
        await response.json();
        navigate('/');
      } catch (error) {
        alert(error)
      } finally {
        setLoading(false);
      }
    } else {
      alert('Svp rentrez une image à génerer avant de vouloir la partager')
    }
  }

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value })
  }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if(form.prompt) {
      try {
        setGeneratingImg(true)
        const response = await fetch('https://aipicgenerator.onrender.com/api/v1/dalle', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ prompt: form.prompt }), 
        })
        const data = await response.json();

        setForm({...form, photo: `data:image/jpeg;base64,${data.photo}`})
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('veuillez remplir le champ !!')
    }
  }

  return (
    <section className='max-w-4xl mx-auto text-center'>
      <div>
        <h1 className='rounded-md font-extrabold text-[30px] sm:text-[40px] w-full text-center p-4 mt-6 mb-14 bg-slate-400 text-white'>Créer ta propre image</h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w[500px]'>Invente une image qui n'éxiste pas encore</p>
      </div>
      <form action="" className='mt-12 max-w-3xl mx-auto' onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField 
            labelName="Nom"
            type='text'
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />
          <p className=''>Ecris l'image que tu veux génerer ou génere une idée au hasard</p>
          <FormField 
            labelName="Génerer texte aléatoirement"
            type='text'
            name="prompt"
            placeholder="Un robot qui mange une pomme"
            value={form.prompt}
            handleChange={handleChange}
            handleSurpriseMe = {handleSurpriseMe}
            isSurpriseMe
          />
          <div 
            className="relative mt-3 mx-auto bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg 
          focus:ring-blue-500 focus:border-blue-500 w-80 p-2 h-80 flex justify-center items-center"
          >
            {form.photo ? (
              <img 
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img 
                src={preview}
                alt="preview"
                className='w-9/12 h-9/12 object-contain opacity-40'
              />
            )}
            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex justify-center gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="text-white bg-green-600 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-green-800"
          >
            { generatingImg ? '...génération en cours' : 'Créer une Image' }
          </button>
        </div>
        <div className="mt-10">
          <p className='mt-2 text-[#666e75] text-[14px] text-center'>Une fois que vous avez créé une image vous pourrez la partager à la communauté</p>
          <div className="flex justify-center">
          <button
            type='submit'
            className='mt-5 mb-5 text-white bg-[#6469ff] hover:bg-[#474ce7] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
          >
            Partager l'image
          </button>
          </div>
        </div>
      </form>
    </section>
  )
}

export default CreatePost