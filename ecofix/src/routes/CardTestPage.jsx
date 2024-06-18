import Card from '../components/pesquisa-especialista/Card';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import '../styles/cardSearch.scss'

function CardTestPage() {
    return (
        <div className="CardTestPage">
            <Header/>
            <Card/>
            <Footer/>
        </div>
    );
}

export default CardTestPage;