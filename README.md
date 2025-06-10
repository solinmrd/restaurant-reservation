🍽️ Restoran Rezervasyon Sistemi
Bu proje, restoran müşterilerinin çevrimiçi olarak masa rezervasyonu yapmalarını sağlayan bir web uygulamasıdır. Kullanıcı dostu arayüzü sayesinde kullanıcılar hızlıca giriş yapabilir, tarih ve saate göre uygun masa rezervasyonu oluşturabilir, mevcut rezervasyonlarını görebilir veya iptal edebilir. Admin paneli üzerinden ise rezervasyonlar takip edilip yönetilebilir.

🎯 Projenin Amacı
Günümüzde restoranlarda telefonla rezervasyon alma süreci zaman alıcı ve hataya açık olabilir. Bu sistem ile rezervasyon süreci dijital ortama taşınarak hem kullanıcı hem işletme tarafında daha hızlı, güvenli ve erişilebilir bir deneyim sağlanması hedeflenmiştir.

🛠️ Geliştirme Süreci
Frontend tamamen tarafımdan geliştirildi. Kullanıcı deneyimini ön planda tutarak HTML, CSS ve JavaScript ile responsive bir arayüz tasarlandı.

Backend tarafı ve veritabanı (Java + Spring Boot + H2 Database) proje ortağım tarafından geliştirildi.

H2 veritabanı kullanılarak veriler uygulama çalıştığı sürece bellekte tutulur; test ve demo uygulamaları için idealdir.

👥 Kullanıcı Rolleri
👤 Kullanıcı
Kayıt olabilir ve sisteme giriş yapabilir.

Takvim üzerinden uygun tarih ve saat seçerek rezervasyon oluşturabilir.

Önceden yaptığı rezervasyonları görebilir veya iptal edebilir.

🧑‍💼 Admin
Sisteme özel kullanıcı adı ve şifre ile giriş yapar.

Tüm rezervasyonları görüntüler.

İptal edilen rezervasyonları takip eder ve sistemi yönetir.

🔐 Giriş Bilgileri
Admin Paneli:
Kullanıcı Adı: admin

Şifre: admin123

Örnek Kullanıcı:
Ad Soyad: Solin Murad

E-posta: solinnmurad@gmail.com

Telefon: 5412223344

🌐 Uygulama Linkleri
Ana Sayfa: http://localhost:8080

H2 Konsolu: http://localhost:8080/h2-console

JDBC URL: jdbc:h2:mem:testdb

Username: sa

Password: (boş bırakın)

💻 Kurulum ve Çalıştırma
Bu repoyu bilgisayarınıza klonlayın:

bash
Kopyala
Düzenle
git clone https://github.com/solinmrd/restaurant-reservation.git
Spring Boot projesini başlatın.

Tarayıcınızdan http://localhost:8080 adresine giderek uygulamayı test edebilirsiniz.

📸 Ekran Görüntüleri
(Buraya anasayfa, kullanıcı paneli ve admin paneli gibi ekran görüntüleri eklenebilir.)

📄 Lisans
Bu proje yalnızca eğitim amaçlı geliştirilmiştir. Açık kaynak lisansı bulunmamaktadır.
