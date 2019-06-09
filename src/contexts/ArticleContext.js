import React, { useState } from 'react'

export const nullArticle = {
  author: {},
  tags: [],
}

const ArticleContext = React.createContext({
  article: nullArticle,
  comments: [],
  error: null,
  setError: () => { },
  clearError: () => { },
  setArticle: () => { },
  clearArticle: () => { },
  setComments: () => { },
  addComment: () => { },
})

export default ArticleContext

export function ArticleProvider(props) {
  const [article, setArticle] = useState(nullArticle)
  const [comments, setComments] = useState([])
  const [error, setError] = useState({
    error: null
  })

  const setErrorFn = error => {
    setError({ error })
  }

  const clearError = () => {
    setError(null)
  }

  const setArticleFn = article => {
    setArticle(article)
  }

  const setCommentsFn = comments => {

    setComments(comments)

  }

  const clearArticle = () => {
    setArticle(nullArticle)
    setComments([])
  }

  const addComment = comment => {
    setComments([
      ...comments,
      comment
    ])
  }



  const value = {
    article: article,
    comments: comments,
    error: error,
    setError: setErrorFn,
    clearError: clearError,
    setArticle: setArticleFn,
    setComments: setCommentsFn,
    clearArticle: clearArticle,
    addComment: addComment,
  }
  return (
    <ArticleContext.Provider value={value}>
      {props.children}
    </ArticleContext.Provider>
  )
}

