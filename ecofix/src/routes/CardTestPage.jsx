import Card from '../components/pesquisa-especialista/Card';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import '../styles/cardSearch.css'
function CardTestPage() {
    return (
        <div className="CardTestPage">
            <Header/>
            <Card 
              imgPath="" 
              name="John Doe" 
              email="johndoe@example.com" 
              address="New York, USA" 
              expertise={['Renewable Energy', 'Sustainable Agriculture']} 
              availability="Available now" 
            />
            <Footer/>
        </div>
    );
}

export default CardTestPage;