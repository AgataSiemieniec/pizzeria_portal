# Dashboard

- '/'
  - statystyki dzisiejszych zamówień (zdalne i lokalne)
  - lista rezerwacji i eventów zaplanowanych na dzisiaj

# Logowanie

- '/login'
  - pola na login i hasło
  - guzik do zalogowanie (link do dashboardu)

# Widok dostepnośc stolików

- '/tables'
  - wybór daty i godizny
  - tablea z listą rezerwacji oraz wydarzeń
    - każda kolumna = 1 stolik
    - każdy wiersz = 30 minut
    - ma przypominać widok tygodnia w kalendarzu Google gdzie w kolumanch zamiast dni są rózne stoliki
    - po kliknieicu rezerwacji lub eventu, przechodzimy na stronę szczegółów
- '/tables/bookig/:id'
  - zawiera informacje dotyczace rezerwacji
  - umozliwia edycję i zapisanie zmian
- '/tables/bookig/new'
  - analogicznie do powyżej, bez początkowych informacji
- '/tables/events/:id'
  - analogicznie do powyżej, dla eventów
- '/tables/events/new'
  - analogicznie do powyżej, dla eventów, bez początkowych informacji

# Widok kelnera

- '/waiter'
  - tabela
    - w wierszach stoliki
    - w kolumnach różne rodzaje informacji (status, czas od osttaniej aktywności)
    - w ostatniej kolumnie dostępne akcje dla danego stolika
- '/waiter/order/new'
  - numer stolika (edytowalny)
  - menu roduktu
  - opcje wybranego produktu
  - zamówienie (zamówione produkty z opcajmi i ceną)
  - kwotę zamówienia
- '/waiter/order/:id'
  - jak powyższa

# Widok kuchni
- '/kitchen'
  - wyęsiwtlać listę zamówień w kolejności ich złożenia
  - lista usi zawierać:
    -numer stolika ( lub zamówienia zdalnego)
    - pełne informacje dotyczące zamówionych dań
  - na liście musi być możliwość oznaczenia zamówienia jako zrealizowane
