mod constants;
mod store;

mod types {
    mod index;
    mod task;
}

mod events {
    mod index;
    mod trophy;
    mod progress;
}

mod components {
    mod achievable;
}

#[cfg(test)]
mod tests {
    mod setup;
    mod test_achievable;

    mod mocks {
        mod achiever;
    }
}
