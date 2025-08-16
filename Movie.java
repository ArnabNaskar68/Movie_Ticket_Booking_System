import java.util.*;

// Movie class
class Movie {
    private String title;
    private String showTime;
    private int totalSeats;
    private int bookedSeats;

    public Movie(String title, String showTime, int totalSeats) {
        this.title = title;
        this.showTime = showTime;
        this.totalSeats = totalSeats;
        this.bookedSeats = 0;
    }

    public String getTitle() {
        return title;
    }

    public String getShowTime() {
        return showTime;
    }

    public int getAvailableSeats() {
        return totalSeats - bookedSeats;
    }

    public boolean bookTickets(int count) {
        if (count <= getAvailableSeats()) {
            bookedSeats += count;
            return true;
        } else {
            return false;
        }
    }

    public void displayMovie() {
        System.out.println("🎬 " + title + " | Show Time: " + showTime + " | Available Seats: " + getAvailableSeats());
    }
}

// Booking System class
class BookingSystem {
    private List<Movie> movies;

    public BookingSystem() {
        movies = new ArrayList<>();
    }

    public void addMovie(Movie movie) {
        movies.add(movie);
    }

    public void displayMovies() {
        System.out.println("\n📽️ Available Movies:");
        for (int i = 0; i < movies.size(); i++) {
            System.out.print((i + 1) + ". ");
            movies.get(i).displayMovie();
        }
    }

    public void bookTicket(int movieChoice, int seatCount) {
        if (movieChoice > 0 && movieChoice <= movies.size()) {
            Movie selectedMovie = movies.get(movieChoice - 1);
            if (selectedMovie.bookTickets(seatCount)) {
                System.out.println("✅ Successfully booked " + seatCount + " tickets for " + selectedMovie.getTitle());
            } else {
                System.out.println("❌ Not enough seats available!");
            }
        } else {
            System.out.println("❌ Invalid movie choice!");
        }
    }
}

// Main class
public class MovieTicketBooking {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        BookingSystem system = new BookingSystem();

        // Add some movies
        system.addMovie(new Movie("Avengers: Endgame", "6:00 PM", 50));
        system.addMovie(new Movie("Inception", "9:00 PM", 40));
        system.addMovie(new Movie("Interstellar", "3:00 PM", 30));

        int choice;
        do {
            System.out.println("\n====== Movie Ticket Booking System ======");
            System.out.println("1. View Movies");
            System.out.println("2. Book Ticket");
            System.out.println("3. Exit");
            System.out.print("Enter choice: ");
            choice = sc.nextInt();

            switch (choice) {
                case 1:
                    system.displayMovies();
                    break;
                case 2:
                    system.displayMovies();
                    System.out.print("Select movie number: ");
                    int movieChoice = sc.nextInt();
                    System.out.print("Enter number of tickets: ");
                    int seats = sc.nextInt();
                    system.bookTicket(movieChoice, seats);
                    break;
                case 3:
                    System.out.println("👋 Thank you for using the booking system!");
                    break;
                default:
                    System.out.println("❌ Invalid choice!");
            }
        } while (choice != 3);

        sc.close();
    }
}
