import Head from 'next/head';

import PricingPlans from './components/PricingPlans';

const Home = ({ plans }) => (

  <div className="container">
    <Head>
        <title>Plans & prices</title>
        <link rel="stylesheet" href="https://bootswatch.com/4/cosmo/bootstrap.min.css" />
        <link rel="stylesheet" href="custom.css" />
    </Head>

    <main>

        <div className="container">
            <h1 className="mt-5">Plans & prices</h1>
            <br />

            <PricingPlans />
        </div>
    </main>

  </div>
)

export default Home
