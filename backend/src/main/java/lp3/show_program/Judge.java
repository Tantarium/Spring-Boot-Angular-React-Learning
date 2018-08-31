package lp3.show_program;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Judge {

    private @Id @GeneratedValue long id;
    private String firstName;
    private String lastName;
    private int number;

    public Judge() {}

    public Judge(long id, String firstName, String lastName, int number) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.number = number;
    }

    public long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public int getNumber() {
        return number;
    }

    public void setId(long id) {
        this.id = id;
    }
}
