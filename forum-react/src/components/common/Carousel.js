import React, {Component} from 'react'
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap'

const items = [
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPlFs5BCPRmUwq35K-ELHvDjofwSbpW5JhODKSxQdN7UPogCOW',
        altText: 'forum 1',
        caption: 'Welcome to FORUM'
    },
    {
        src: 'http://www.silencetodo.com/wp-content/uploads/2018/03/1_community_banner-1.png',
        altText: 'forum 2', caption: 'Welcome to FORUM'

    },
    {
        src: 'http://www.usingtheirwords.org/wp-content/uploads/2017/09/community-hero.png',
        altText: 'forum3', caption: 'Welcome to FORUM'
    }

]

class Test extends Component {
    constructor(props) {
        super(props)
        this.state = {activeIndex: 0}
        this.next = this.next.bind(this)
        this.previous = this.previous.bind(this)
        this.goToIndex = this.goToIndex.bind(this)
        this.onExiting = this.onExiting.bind(this)
        this.onExited = this.onExited.bind(this)
    }

    onExiting() {
        this.animating = true
    }

    onExited() {
        this.animating = false
    }

    next() {
        if (this.animating) return
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1
        this.setState({activeIndex: nextIndex})
    }

    previous() {
        if (this.animating) return
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1
        this.setState({activeIndex: nextIndex})
    }

    goToIndex(newIndex) {
        if (this.animating) return
        this.setState({activeIndex: newIndex})
    }

    render() {
        const {activeIndex} = this.state

        const slides = items.map((item) => {
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item.src}
                >
                    <img className="d-block w-100" src={item.src} alt={item.altText}/>
                    <CarouselCaption captionText={item.caption} captionHeader={item.caption}/>
                </CarouselItem>
            )
        })

        return (
            <Carousel
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous}
            >
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex}/>
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous}/>
                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next}/>
            </Carousel>
        )
    }
}


export default Test