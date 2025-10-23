import React from 'react'

import Slides from './Slides'
import ThreeItem from './ThreeInfo';
import BrowseOurCategory from './BrowseOurCategory';
import ProductAll1 from '../Product/ProductAll/ProductAll-Home';

export default function Home() {
    document.title = "Trang chủ";

    return (

        <>
            <Slides />
            <section className='hdl-maincontent'>
                <div className='mx-auto'>
                    <ThreeItem />
                    <BrowseOurCategory />
                    <ProductAll1 />
                </div>
            </section>
        </>
    )
}
