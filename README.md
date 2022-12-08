Fırat ÇELİK - Banka Hesap İşlemleri Uygulaması

Yapılanlar :
• Backend kısmında .Net Core 7 sürümü kullanıldı. Veriler manuel oluşturulup Session bilgisinde tutuldu.
• Material UI Table kullanılarak, api aracılığı ile kullanıcının banka hesaplarının listelendiği bir liste oluşturuldu.
• Hesap listesinde her bir kaydın sağ tarafında Para Yatır ve Para Çek butonları yer aldı.
• Para Yatır - Para Çek butonları için modal componentler tasarlandı.
• Para yatırma - çekme modallarında güncel bakiye bilgisi ve işlem sonrası tahmini bakiye bilgilerinin yer aldığı alanlar eklendi.
• Para yatırma - çekme modallarında inputlarda decimal değer validasyonu yazıldı ve buna ilişkin kısıtlamalar düzenlendi.
• Para çekme işlemlerinde bakiye kontrolü sağlandı, yetersiz olduğu durumlarda "Çek" butonu deaktif edilip işlem yapılması kısıtlandı.
• Ağırlıklı olarak Material UI kütüphanesi ve ona ait alt özellikleri kullanıldı.
• Para yatır-çek işlemi tamamlandığında api aracılığı ile güncel veriler çekilip, tablo verileri güncellenmektedir.  
• Unit Test(Angular/Jasmine) sistemi oluşturuldu.

Yapılamayanlar:

• Kısıtlı zaman sebebi ile ;
* Backend projesi için Unit Test oluşturulamadı. (Oluşturduğumda bazı hatalar almam üzerine silmek durumunda kaldım)
* Backend projesinde Session alt yapısı kullandım. Bu alt yapı swagger ile gayet düzgün çalışmakta fakat
  frontend ile istek attığımda session anlam veremediğim bir biçimde sıfırlanmakta. Gerekli tüm ayarları yaptım fakat
  durum düzelmedi kısıtlı zaman nedeni ile maalesef çok ilgilenemedim. Bu sebeple proje işlemleri swaggerda olması gerektiği gibi çalışmakta
  ama frontend tabanlı işlemlerde maalesef default ayarlarında çalışmakta ve değişiklikleri sisteme yansıtamamaktadır.
* Frontend projesinde Unit Test oluştrdum fakat "Data Service" implementasyonunda bir hata verdi çözmeye çalıştım fakat süre nedeni ile maalesef çok ilgilenemedim.
