import React, { useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ArticleContext, { nullArticle } from '../../contexts/ArticleContext'
import ArticleApiService from '../../services/article-api-service'
import { NiceDate, Hyph, Section } from '../../components/Utils/Utils'
import StyleIcon from '../../components/StyleIcon/StyleIcon'
import CommentForm from '../../components/CommentForm/CommentForm'
import './ArticlePage.css'

export default function ArticlePage(props) {
  // static defaultProps = {
  //   match: { params: {} },
  // }


  const context = useContext(ArticleContext)
  // let isRendered = false;

  async function loadData() {
    const { articleId } = props.match.params
    context.clearError()
    ArticleApiService.getArticle(articleId)
      .then(context.setArticle)
      .catch(context.setError)
    ArticleApiService.getArticleComments(articleId)
      .then(context.setComments)
      .catch(context.setError)
  }

  useEffect(() => {
    loadData()
    return () => {
      console.log('clear article ran')
      context.clearArticle()
    }
  }, [])

  console.log('context: ', context)

  const renderArticle = () => {
    const { article, comments } = context
    return <>
      <h2>{article.title}</h2>
      <p>
        <ArticleStyle article={article} />
        {article.author.id && <>
          <Hyph />
          <ArticleAuthor article={article} />
        </>}
        <Hyph />
        <NiceDate date={article.date_created} />
      </p>
      <ArticleContent article={article} />
      <ArticleComments comments={comments} />
      <CommentForm />
    </>
  }


  const { error, article } = context
  let content
  if (error) {
    content = (error.error === `Article doesn't exist`)
      ? <p className='red'>Article not found</p>
      : <p className='red'>There was an error</p>
  } else if (!article.id) {
    content = <div className='loading' />
  } else {
    content = renderArticle()
  }

  return (
    <Section className='ArticlePage'>
      {content}
    </Section>
  )


}



function ArticleStyle({ article }) {
  return (
    <span className='ArticlePage__style'>
      <StyleIcon style={article.style} />
      {' '}
      {article.style}
    </span>
  )
}

function ArticleAuthor({ article = nullArticle }) {
  return (
    <span className='ArticlePage__author'>
      {article.author.full_name}
    </span>
  )
}

function ArticleContent({ article }) {
  return (
    <p className='ArticlePage__content'>
      {article.content}
    </p>
  )
}

function ArticleComments({ comments = [] }) {
  return (
    <ul className='ArticlePage__comment-list'>
      {comments.map(comment =>
        <li key={comment.id} className='ArticlePage__comment'>
          <p className='ArticlePage__comment-text'>
            <FontAwesomeIcon
              size='lg'
              icon='quote-left'
              className='ArticlePage__comment-icon blue'
            />
            {comment.text}
          </p>
          <p className='ArticlePage__comment-user'>
            {comment.user.full_name}
          </p>
        </li>
      )}
    </ul>
  )
}
