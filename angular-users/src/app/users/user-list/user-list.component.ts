import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UserService, User, UsersState } from '../user.service';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  filteredUsers: User[] = [];
  state: UsersState = 'idle';

  pageSize = 5;
  currentPage = 1;
  searchTerm = '';

  form = {
    id: 0,
    name: '',
    email: '',
    password: '',
  };
  editing = false;
  showModal = false;

  private destroy$ = new Subject<void>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.state = 'loading';

    this.userService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (users) => {
          this.users = users;
          this.applyFilter();
          this.state = users.length ? 'loaded' : 'empty';
        },
        error: () => {
          this.state = 'error';
        },
      });
  }

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = term
      ? this.users.filter((u) => u.name.toLowerCase().includes(term))
      : [...this.users];
    this.currentPage = 1;
  }

  onSearchChange(term: string): void {
    this.searchTerm = term;
    this.applyFilter();
  }

  get totalPages(): number {
    return this.filteredUsers.length
      ? Math.ceil(this.filteredUsers.length / this.pageSize)
      : 1;
  }

  get pagedUsers(): User[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredUsers.slice(start, start + this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
  }

  goFirst(): void {
    this.goToPage(1);
  }

  goLast(): void {
    this.goToPage(this.totalPages);
  }

  goPrev(): void {
    this.goToPage(this.currentPage - 1);
  }

  goNext(): void {
    this.goToPage(this.currentPage + 1);
  }

  startCreate(): void {
    this.editing = false;
    this.form = { id: 0, name: '', email: '', password: '' };
    this.showModal = true;
  }

  startEdit(user: User): void {
    this.editing = true;
    this.form = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: '',
    };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveUser(): void {
    if (this.editing) {
      this.userService
        .updateUser(this.form.id, {
          name: this.form.name,
          email: this.form.email,
          password: this.form.password || undefined,
        })
        .subscribe(() => {
          this.showModal = false;
          this.loadUsers();
        });
    } else {
      this.userService
        .createUser({
          name: this.form.name,
          email: this.form.email,
          password: this.form.password,
        })
        .subscribe(() => {
          this.showModal = false;
          this.loadUsers();
        });
    }
  }

  deleteUser(user: User): void {
    if (!confirm(`¿Eliminar al usuario ${user.name}?`)) {
      return;
    }

    this.userService.deleteUser(user.id).subscribe(() => this.loadUsers());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
