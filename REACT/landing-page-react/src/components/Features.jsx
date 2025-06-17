const features = [
  {
    title: 'Rapide à déployer',
    description: 'Votre page est opérationnelle en quelques minutes.'
  },
  {
    title: 'Responsive',
    description: 'Optimisé pour tous les appareils (mobile, tablette, PC).'
  },
  {
    title: 'Moderne',
    description: 'Design professionnel avec les dernières technos.'
  }
];

const Features = () => {
  return (
    <section style={{ padding: '40px', backgroundColor: '#fff' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Pourquoi nous choisir ?</h2>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        gap: '20px',
        flexWrap: 'wrap'
      }}>
        {features.map((feature, index) => (
          <div key={index} style={{
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '20px',
            maxWidth: '300px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
