export default function About() {
  return (
    <div className="py-16 space-y-8">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl font-black bg-gradient-to-r from-azriella-pink to-azriella-navy bg-clip-text text-transparent mb-4">
          About Azriella
        </h1>
        <p className="text-lg text-neutral-700 leading-relaxed">
          Azriella is a vibrant kids-first African-inspired fashion brand based in Canada, offering matching pieces for the whole family. 
          We celebrate culture, creativity, and style through bold prints, premium quality, and comfortable designs.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <div className="rounded-2xl border-2 border-azriella-pink/20 bg-white p-8 text-center">
          <div className="text-4xl mb-4">🎨</div>
          <h3 className="font-black text-azriella-navy text-xl mb-2">Bold Designs</h3>
          <p className="text-neutral-600 text-sm">Vibrant African-inspired prints that make a statement</p>
        </div>
        
        <div className="rounded-2xl border-2 border-azriella-navy/20 bg-white p-8 text-center">
          <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
          <h3 className="font-black text-azriella-navy text-xl mb-2">Family First</h3>
          <p className="text-neutral-600 text-sm">Matching styles for kids and adults to celebrate together</p>
        </div>
        
        <div className="rounded-2xl border-2 border-azriella-pink/20 bg-white p-8 text-center">
          <div className="text-4xl mb-4">🇨🇦</div>
          <h3 className="font-black text-azriella-navy text-xl mb-2">Made in Canada</h3>
          <p className="text-neutral-600 text-sm">Proudly designed and crafted in Canada</p>
        </div>
      </div>
    </div>
  );
}
