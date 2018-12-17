import React from 'react'
import classNames from 'classnames'

class BookDetail extends React.Component {
  render() {
    const { onClose, book } = this.props

    return (
      <div className="book_detail">
        <div className="book_detail_content">
          <div className="book_detail_close" onClick={onClose} />
          <div className="book_detail_container">
            <div className="book_detail_container_intro">
              <div className="book_detail_container_cover">
                <img src={book.cover} />
              </div>
              <div className="book_detail_container_score">
                <div className="book_detail_container_value">
                  <div className="value">
                    <span className="title">评分</span>
                    <em className="value">{book.score}</em>
                  </div>
                </div>
                <div className="book_detail_container_command">
                  评论
                  {' '}
                  {book.commands}
                  {' '}
条
                </div>
              </div>
              <div className="book_detail_container_bg">
                <h2 className="book_detail_container_title">
                  {book.name}
                </h2>
                <p className="book_detail_container_author">
                  作者：
                  {book.author}
                </p>
                <p className="book_detail_container_recommand">
                  {book.recommender.map(u => u)}
                  {' '}
等
                  {' '}
                  {book.recommender.length}
                  {' '}
位行业大咖诚意推荐
                </p>
                <p className="book_detail_container_price">
                  售价：
                  <span className="price">
                    {book.price}
                    {' '}
元
                                    </span>
                </p>
                <p className="book_detail_container_pring">
                  定价：
                  <span className="price">
                    {book.pricing}
                    {' '}
元
                                    </span>
                </p>
              </div>
            </div>
            <div className="book_detail_container_info">
              <div className="book_detail_container_meta">
                <p>
                  <span>
ISBN：
                    {book.isbn}
                  </span>
                  <span>
出版社：
                    {book.publish}
                  </span>
                </p>
                <p>
                  <span>
开 本：
                    {book.pageType}
                  </span>
                  <span>
书架号：
                    {book.bookshelf}
                  </span>
                </p>
                <p>
                  <span>
页 数：
  {book.pageNumber}
</span>

                </p>
                <p><span>{book.version}</span></p>
              </div>
              <div className="book_detail_container_det">
                <h4>内容简介：</h4>
                <p>{book.intro}</p>
              </div>
              <div className="book_detail_container_det">
                <h4>作者简介：</h4>
                <p>{book.authorInfo}</p>
              </div>
              <div className="book_detail_container_det">
                <h4>目录：</h4>
                <p>{book.catalog}</p>
              </div>
            </div>
          </div>
          <div className="book_detail_recommand">
            <h4>相关书籍</h4>
          </div>
        </div>
      </div>
    )
  }
}

export default BookDetail
